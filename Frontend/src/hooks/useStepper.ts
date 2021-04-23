import { FormEvent, FormEventHandler, useCallback, useState } from 'react'

interface UseStepper {
    step: number
    nextStepHandler: FormEventHandler
    prevStepHandler: () => void
}

export const useStepper = (): UseStepper => {
    const [step, setStep] = useState<number>(1)

    const nextStepHandler = useCallback((event: FormEvent) => {
        event.preventDefault()
        setStep(2)
    }, [])

    const prevStepHandler = useCallback(() => {
        setStep(1)
    }, [])

    return {
        step,
        nextStepHandler,
        prevStepHandler
    }
}
