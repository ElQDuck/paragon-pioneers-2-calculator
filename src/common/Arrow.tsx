import Xarrow, { refType, xarrowPropsType } from 'react-xarrows'
import { theme } from '../assets/styling/Theme'

export const Arrow: React.FC<xarrowPropsType> = (props: { start: refType; end: refType }) => {
  return (
    <Xarrow
      start={props.start} //can be react ref
      end={props.end} //or an id
      startAnchor="left"
      endAnchor="right"
      color={theme.palette.primary.dark}
      curveness={0.45} // TODO: Adjust later
    />
  )
}
