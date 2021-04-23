import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react'

type UseInput = [string, ChangeEventHandler]

export const useInput = (initialValue?: string): UseInput => {
    const [value, setValue] = useState<string>(initialValue ?? '')

    const valueChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
        },
        []
    )

    return [value, valueChangeHandler]
}
