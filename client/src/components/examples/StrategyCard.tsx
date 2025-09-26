import StrategyCard from '../StrategyCard'
import { mockStrategies } from '@/data/strategies'

export default function StrategyCardExample() {
  return <StrategyCard strategy={mockStrategies[0]} />
}