import { SxProps, Theme } from '@mui/material/styles'

export const SingleBuildingWithCount: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export const BuildingGroup: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

export const ProviderBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
}

export const ProviderPaperStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: 0.25,
  width: 'fit-content',
}

export const ConsumerPaperStyle: SxProps<Theme> = {
  padding: 0.25,
  marginRight: 10,
}

export const BuildingImageSize = { width: '4rem' }
