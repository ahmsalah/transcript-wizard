'use client'
import {
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Tooltip,
} from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo } from 'react'
import { CheckRounded, HistoryRounded } from '@mui/icons-material'
import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useI18n } from '@/i18n'
import type { WizardFormType } from './Wizard.form'

type WizardFormInputProps = {
  onSubmit: () => void
  onReset: () => void
  hasFormValueChanged: boolean
  control: Control<WizardFormType>
}

export const WizardFormInput: FunctionComponent<WizardFormInputProps> = memo(
  ({ control, hasFormValueChanged, onReset, onSubmit }) => {
    const { t } = useI18n()

    return (
      <Controller
        control={control}
        name='value'
        render={({ field }) => (
          <FormControl className='no-drag'>
            <OutlinedInput
              {...field}
              endAdornment={
                <>
                  <Fade appear in={hasFormValueChanged}>
                    <Tooltip title={t('reset')}>
                      <IconButton onClick={onReset} size='small'>
                        <HistoryRounded />
                      </IconButton>
                    </Tooltip>
                  </Fade>

                  <Tooltip title={t('save')}>
                    <IconButton onClick={onSubmit} size='small'>
                      <CheckRounded />
                    </IconButton>
                  </Tooltip>
                </>
              }
              fullWidth
              sx={{ textAlign: 'center', width: 1 }}
            />
            <FormHelperText id='my-helper-text'>{t('press_enter_key_to_save')}</FormHelperText>
          </FormControl>
        )}
      />
    )
  },
)

WizardFormInput.displayName = 'WizardFormInput'
