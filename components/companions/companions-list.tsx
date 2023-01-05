import { companions } from '../data'

export default function CompanionsList() {
  return (
    <div>
      {companions.map(comp => (
        <div key={comp.name}>
          <div>{comp.name}</div>
          <div>{comp.desc}</div>
          <div>{comp.subtype}</div>
          <ul>
            <li>move: {comp.stats.move}</li>
            <li>fight: {comp.stats.fight}</li>
            <li>shoot: {comp.stats.shoot}</li>
            <li>armor: {comp.stats.armor}</li>
            <li>will: {comp.stats.will}</li>
            <li>health: {comp.stats.health}</li>
            <li>notes: {comp.stats.notes}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
