import {useEffect, useState} from 'react';
import styled from 'styled-components';


const ContainedStyle = styled.div`
z-index: 2;
    position: relative;
    width: 100px;
    .input {
        cursor: pointer;
        background-color: rgb(26 86 219/1);
        font-weight: 500;
        text-align: center;
        color: rgb(255 255 255/1);
        font-size: .875rem;
        padding-bottom: .625rem;
        padding-top: .625rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        border-radius: .5rem;
        outline: none;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
                    margin-right: 5px;
                }
        &:hover {
            background-color: rgb(30 66 159/1);
        }
        .size-6 {
            width: 16px;
            margin-left: 10px;
        }
    }
    .dropdown {
        position: absolute;
        margin: 0px;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
        background-color: rgb(255 255 255/1);
        border-radius: .5rem;
        width: 11rem;
        z-index: 10;
        ul {
            color: rgb(55 65 81/1);
            list-style: none;
            margin: 0;
            padding: 0;
            font-size: .875rem;
            padding-bottom: .5rem;
            padding-top: .5rem;
            max-height: 450px;
            overflow: auto;
            li {
                cursor: pointer;
                padding-bottom: .5rem;
                padding-top: .5rem;
                padding-left: 1rem;
                padding-right: 1rem;
                display: flex;
                align-items: center;
                img {
                    margin-right: 4px;
                }
                &:hover {
                    background-color: rgb(243 244 246/1);
                }
            }
        }
    }
`

export interface Currency {
    currency: string
    date: string
    price: number
    icon: string
}

interface Props {
data: Currency[]
defaultValue: {name: string, icon: string, price: number}
onChange: (e: {name: string, icon: string, price: number}) => void
}

const Dropdown: React.FC<Props> = ({ data, defaultValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [currency, setCurrency] = useState<Currency[]>([])
    const [value, setValue] = useState<{name: string, icon: string}>()
    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue)
        }
        if (data?.length && !value) {
            setCurrency(data?.filter((v) => v.currency!== defaultValue.name))
        }
        if (data?.length && value) {
            setCurrency(data?.filter((v) => v.currency!== value.name))
        }
    }, [defaultValue, data, value])
    return (
       <>
        <ContainedStyle>
            <button onClick={()=>setIsOpen(!isOpen)} className='input'><img width={'20px'} src={value?.icon || ''} alt=''/>{value?.name} {isOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>}
            </button>
            {isOpen ? <div className="dropdown">
    <ul>
      {currency?.map((v, i) => <li onClick={() => {
        setValue({
            name: v.currency,
            icon: v.icon,
        })
        setIsOpen(!isOpen)
        onChange({
            name: v.currency,
            icon: v.icon,
            price: v.price
        })
      }} key={i}><img width={'20px'} src={v.icon || ''} alt=''/> {v.currency}</li>)}
    </ul>
</div> : <></>}
        </ContainedStyle>
        {isOpen ? <div
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              zIndex: 1
            }}
          /> : <></>}
        </>
    );
}

export default Dropdown;
