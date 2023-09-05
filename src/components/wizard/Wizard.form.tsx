'use client'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export type WizardFormType = {
  value: string
}
type UseWizardFormParams = {
  onSave: (newValue: string) => void
  initialValue: string
}

export const useWizardForm = ({ onSave, initialValue }: UseWizardFormParams) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty: hasFormValueChanged },
  } = useForm<WizardFormType>({
    mode: 'onChange',
    defaultValues: {
      value: initialValue,
    },
  })

  const onSubmit = useCallback(
    ({ value }: WizardFormType) => {
      onSave(value)
    },
    [onSave],
  )

  const onReset = useCallback(() => {
    reset({ value: initialValue })
  }, [initialValue, reset])

  useEffect(() => {
    onReset()
  }, [onReset])

  return {
    onSubmit: handleSubmit(onSubmit),
    onReset,
    control,
    hasFormValueChanged,
  }
}
