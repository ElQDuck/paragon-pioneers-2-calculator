import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { SxProps, Theme } from '@mui/material/styles'
import { signal } from '@preact/signals'
import { useState } from 'react'
import { globalNumberInputReadOnly } from '../App'
import { StyledButton, StyledInput, StyledInputRoot } from '../assets/styling/Theme'
import { capitalCase } from 'change-case'

export const BuildingButton = (props: {
  updateProductionChanFunction: Function
  buttonIcon: string
  buildingElement: any
}) => {
  const count = signal<number>(0)
  const [imgIsLoaded, setImgIsLoaded] = useState<Boolean>(false)
  // The resource image size is 128 x 170 ^= 8rem x 10.625rem
  const imgStyle: SxProps<Theme> = { width: { xs: '3rem', md: '4rem' }, height: { xs: '4rem', md: '5.313rem' } }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 'min-content',
      }}
    >
      {imgIsLoaded ? null : (
        // The skeleton size should match the rendered image size to prevent the layout from "jumping during loading"
        <Skeleton variant="rectangular" animation="pulse" sx={{ ...imgStyle, bgcolor: 'grey.900' }} />
      )}
      <Box
        component="img"
        src={props.buttonIcon}
        title={capitalCase(props.buildingElement.name)}
        sx={{ ...imgStyle, display: imgIsLoaded ? {} : 'none' }}
        onLoad={() => {
          setImgIsLoaded(true)
        }}
      />
      <BaseNumberInput
        min={0}
        readOnly={globalNumberInputReadOnly.value}
        onChange={(_event, value) => {
          count.value = value ? value : 0
          props.updateProductionChanFunction(
            props.buildingElement.name,
            count.value === 0 ? undefined : (
              <Box
                sx={{
                  display: 'inline-block',
                  padding: 1,
                  margin: 0.5,
                  border: 1,
                  borderColor: 'primary.main',
                  borderRadius: '16px',
                  background: '#956a3c',
                }}
              >
                <props.buildingElement count={count.value} />
              </Box>
            )
          )
        }}
        defaultValue={0}
        slots={{
          root: StyledInputRoot,
          input: StyledInput,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: <AddIcon fontSize="small" />,
            className: 'increment',
          },
          decrementButton: {
            children: <RemoveIcon fontSize="small" />,
          },
        }}
      />
    </Box>
  )
}
