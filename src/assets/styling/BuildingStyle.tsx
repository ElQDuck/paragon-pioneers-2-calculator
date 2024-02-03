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

// The resource image size is 128 x 170 == 8rem x 10.625rem
export const BuildingImageSize: SxProps<Theme> = {
  width: { xs: '3rem', md: '4rem' },
  height: { xs: '4rem', md: '5.313rem' },
}
