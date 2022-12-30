exports.up = knex =>
  knex.schema.raw(`
        DO
        $do$
        BEGIN
        IF EXISTS (
            SELECT FROM pg_catalog.pg_roles
            WHERE  rolname = 'role_minion') THEN

            RAISE NOTICE 'Role "role_minion" already exists. Skipping.';
        ELSE
            CREATE ROLE role_minion;
        END IF;
        END
        $do$;

        DO
        $do$
        BEGIN
        IF EXISTS (
            SELECT FROM pg_catalog.pg_roles
            WHERE  rolname = 'anonymous_user') THEN

            RAISE NOTICE 'Role "anonymous_user" already exists. Skipping.';
        ELSE
            CREATE ROLE anonymous_user;
        END IF;
        END
        $do$;
        
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        CREATE TYPE user_role as enum('wizard', 'minion');

        CREATE TABLE public.minion (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
            PASSWORD text,
            user_name varchar(50) NOT NULL,
            ROLE user_role DEFAULT 'minion',
            CONSTRAINT core_user_name_key UNIQUE (user_name)
        );
                
        CREATE TABLE public.wizard (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
            user_id uuid REFERENCES public.minion (id),
            CONSTRAINT core_employee_user_id_key UNIQUE (user_id)
        );
        
        ALTER TABLE public.minion ENABLE ROW LEVEL SECURITY;
        
        ALTER TABLE public.wizard ENABLE ROW LEVEL SECURITY;
        
        
        CREATE POLICY policy_minions ON wizard FOR SELECT TO role_minion USING (EXISTS (SELECT user_name
        FROM
            public.minion
        WHERE
            id = user_id
            AND user_name = CURRENT_USER));
        
        CREATE POLICY policy_minion ON minion TO role_minion USING (user_name = CURRENT_USER);
        
        CREATE EXTENSION pgcrypto;
        
        

        CREATE OR REPLACE FUNCTION signup (username varchar(50), PASSWORD varchar(50))
        RETURNS boolean
        AS $$
        DECLARE
            result varchar DEFAULT NULL;
        BEGIN
            SELECT
                user_name
            FROM
                minion
            WHERE
                $1 = user_name INTO result;
            IF NOT found THEN
                INSERT INTO minion (user_name, PASSWORD)
                    values($1, crypt($2, gen_salt('bf')));
            END IF;
            RETURN TRUE;
        END
        $$
        LANGUAGE plpgsql
        VOLATILE
        SECURITY DEFINER;
        
        GRANT EXECUTE ON FUNCTION public.signup(username varchar(50), PASSWORD varchar(50)) TO anonymous_user;

        CREATE TYPE public.jwt_token AS (
            ROLE text, --db role of the user
            exp integer, --expiry date as the unix epoch
            user_id uuid, --db identifier of the user
            username text --username used to sign in, user's email in our case
        );
        
        CREATE OR REPLACE FUNCTION public.signin (username text, PASSWORD text)
        RETURNS public.jwt_token AS $$
        DECLARE
        account public.minion;
        wiz_acc public.wizard;
        ROLE text;
        BEGIN
        SELECT * FROM public.minion AS a
            WHERE a.user_name = $1 INTO account;
        SELECT * FROM public.wizard AS b
            WHERE account.id = user_id INTO wiz_acc;
        
        IF wiz_acc.user_id = account.id THEN 
            ROLE = 'role_minion';
        ELSE
            ROLE = 'role_minion';
        END IF;
        
        IF account.password = crypt($2, account.password) THEN
            RETURN (ROLE, extract(epoch FROM now() + interval '365 days'),
            account.id,
            account.user_name)::public.jwt_token;
        ELSE
            RETURN NULL;
        END IF;
        END;
        $$
        LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
                
        GRANT EXECUTE ON FUNCTION public.signin (username text, PASSWORD text)
        TO anonymous_user;
    `)

exports.down = knex => {
  knex.schema.dropTable('public.minion')
  knex.schema.dropTable('public.wizard')
}
