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
            WHERE  rolname = 'role_wizard') THEN

            RAISE NOTICE 'Role "role_wizard" already exists. Skipping.';
        ELSE
            CREATE ROLE role_wizard;
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

        CREATE TABLE public.minions (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
            PASSWORD text,
            user_name varchar(50) NOT NULL,
            ROLE user_role DEFAULT 'minion',
            CONSTRAINT core_user_name_key UNIQUE (user_name)
        );
                
        CREATE TABLE public.wizards (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
            user_id uuid REFERENCES public.minions (id),
            CONSTRAINT core_employee_user_id_key UNIQUE (user_id)
        );
        
        ALTER TABLE public.minions ENABLE ROW LEVEL SECURITY;
        
        ALTER TABLE public.wizards ENABLE ROW LEVEL SECURITY;
        
        
        CREATE POLICY policy_wizards ON wizards FOR SELECT TO role_wizard USING (EXISTS (SELECT user_name
        FROM
            public.minions
        WHERE
            id = user_id
            AND user_name = CURRENT_USER));
        
        CREATE POLICY policy_minion ON minions TO role_minion USING (user_name = CURRENT_USER);
        
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
                minions
            WHERE
                $1 = user_name INTO result;
            IF NOT found THEN
                INSERT INTO minions (user_name, PASSWORD)
                    values($1, crypt($2, gen_salt('bf')));
                RETURN TRUE;
            END IF;
            RETURN FALSE;
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
            username text, --username used to sign in, user's email in our case
            user_role pg_roles
        );
        
        CREATE OR REPLACE FUNCTION public.signin (username text, PASSWORD text)
        RETURNS public.jwt_token AS $$
        DECLARE
        account public.minions;
        wiz_acc public.wizards;
        ROLE text;
        BEGIN
        SELECT * FROM public.minions AS a
            WHERE a.user_name = $1 INTO account;
        SELECT * FROM public.wizards AS b
            WHERE account.id = user_id INTO wiz_acc;
        
        IF wiz_acc.user_id = account.id THEN 
            ROLE = 'role_wizard';
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
  knex.schema.dropTable('public.minions')
  knex.schema.dropTable('public.wizards')
}
