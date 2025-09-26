import StrategiesGrid from '../StrategiesGrid'
import { mockStrategies } from '@/data/strategies'

export default function StrategiesGridExample() {
  return <StrategiesGrid strategies={mockStrategies.slice(0, 6)} />
}