import { Mercenary as Codegen_Mercenary } from '../../graphql/generated/graphql';

export type Mercenary = Omit<Codegen_Mercenary, 'nodeId' | 'friendsByMercenaryId'>