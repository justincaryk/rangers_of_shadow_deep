import { Option } from 'react-multi-select-component'

export const castServerPickIdsToOptions = ({ ids, options }: { ids?: string[]; options: Option[] }): Option[] => {
  if (!ids) {
    return []
  }
  return ids.map(id => options.find(opt => opt.value === id) ?? null).filter(x => x !== null) as Option[]
}
