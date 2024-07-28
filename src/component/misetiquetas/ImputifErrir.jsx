import React from 'react'
import { useField} from 'formik'
import Input from './myinputtext'
import Estilostexto from '../styleText'

const Formikinput = ({ name, ...props }) => {

    const [field, meta, helper] = useField(name)
    return (
        <>
            <Input
                error={meta.error}
                value={field.value}
                onChangeText={value => helper.setValue(value)}
                {...props}
            />
            {meta.error &&
                <Estilostexto error  > {meta.error} </Estilostexto>
            }

        </>

    )
}

export default Formikinput