import Xarrow, { refType, xarrowPropsType } from 'react-xarrows'
import { globalInvertBuildingChainOrder } from '../App'
import { theme } from '../assets/styling/Theme'

export const Arrow: React.FC<xarrowPropsType> = (props: { start: refType; end: refType }) => {
  return (
    <Xarrow
      start={props.start} //can be react ref
      end={props.end} //or an id
      startAnchor={globalInvertBuildingChainOrder.value ? 'right' : 'left'}
      endAnchor={globalInvertBuildingChainOrder.value ? 'left' : 'right'}
      color={theme.palette.primary.dark}
      curveness={0.45} // TODO: Adjust later
    />
  )
}
