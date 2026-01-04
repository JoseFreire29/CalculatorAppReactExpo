import { useEffect, useRef, useState } from "react";


enum Operator {
    add = '+',
    subtract = '-',
    multiply = '×',
    divide = '÷',
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('');

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>(undefined);

    
    useEffect(() =>{
        if(lastOperation.current){
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }

    }, [number]);
    
    
    
    useEffect(() =>{
        const subResult = calculateSubResult();
        setPrevNumber(`${subResult}`);
    }, [formula]);

    //limpiar todo
    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0');

        lastOperation.current = undefined;
    };

    //cambiar signo
    const toggleSign = () => {
        if (number.includes('-')) {
            return setNumber( number.replace('-', '') );
        }

        setNumber('-' + number);
    };

    //borrar ultimo numero
    const deleteLast = () => {

        let currentSign = '';
        let temporalNumber = number;

        if(number.includes('-')) {
            currentSign = '-';
            temporalNumber = number.substring(1);
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0, -1));
        }
        setNumber('0');
    };

    const setLastNumber = () => {
        calculateResult();

        if (number.endsWith('.')){
            setPrevNumber( number.slice(0, -1) );
        }

        setPrevNumber( number );
        setNumber('0');
    }

    const divideOperation =() => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }


    const multiplyOperation =() => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const substractOperation =() => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }

    const addOperation =() => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }


    const calculateSubResult = () => {
        const [firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if(isNaN(num2)) return num1;
        
        switch (operation) {
            case Operator.add:
                return num1 + num2;
            case Operator.subtract:
                return num1 - num2;
            case Operator.multiply:
                return num1 * num2;
            case Operator.divide:
                return num1 / num2;
            default:
                throw new Error('Invalid operation ${operation}');

        }

    }


    const calculateResult = () => {

        const result = calculateSubResult();
        setFormula(`${  result}`);

        lastOperation.current = undefined;
        setPrevNumber('0');
    };


    const buildNumber = (numberString: string) => {
        //verificar si ya existe un punto decimal
        if (number.includes('.') && numberString === '.') return;

        if ( number.startsWith('0') || number.startsWith('-0')) {

            if( numberString === '.') {
                return setNumber(number + numberString);
            }

            //Evaluar si es otro cero y hay un punto
            if( numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            //evaluar si es diferente de cero y no tiene un punto
            if( numberString !== '0' && !number.includes('.')) {
                return setNumber( numberString );
            }

            //evitarr el 0000.0
            if (numberString === '0' && !number.includes('.')) {
                return;
            }
        }

        setNumber(number + numberString);
    };

    return{
        formula,
        number,
        prevNumber,

        //Methods
        buildNumber,
        clean,
        toggleSign,
        deleteLast,
        divideOperation,
        multiplyOperation,
        substractOperation,
        addOperation,
        calculateSubResult,
        calculateResult,

    
    }


}