import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'

function Main() {
    const formik = useFormik({
        initialValues: {
            resDate: "",
            resTime: "",
            guests: 2,
            occasion: "",
        },
        onSubmit: (e) => {
            e.preventDefault();
          },
        validationSchema: Yup.object({
            resDate: Yup.date().required('Required'),
            resTime: Yup.string().required('Required'),
            guests: Yup.number().required('Required').min(1, 'The minimum number is 1' ).max(10, 'The maximum number is 10'),
            occasion: Yup.string().required('Required'),
          }),
      });
  
    return (
    <main>
        <header>
            <button className="back-button">
                <span class="material-symbols-outlined">
                    arrow_left_alt
                </span>
            </button>
            <h1>Book a Table</h1>
        </header>

        <form onSubmit={formik.handleSubmit} 
        style={{
        display: "grid",
        maxWidth: "200px",
        gap: "15px",
        }}>
            <FormControl isRequired isInvalid={formik.touched.resDate && formik.errors.resDate}>
                <FormLabel htmlFor="resDate">Choose date</FormLabel>
                <input
                    type="date"
                    id="resDate"
                    name="resDate"
                    {...formik.getFieldProps('resDate')}
                />
                <FormErrorMessage>{formik.errors.resDate}</FormErrorMessage>
            </FormControl>
        
            <FormControl isRequired isInvalid={formik.errors.resTime}>
                <FormLabel htmlFor="resTime">Choose time</FormLabel>
                <select
                    id="resTime"
                    name="resTime"
                    {...formik.getFieldProps('resTime')}
                >   
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                </select>
                <FormErrorMessage>{formik.errors.resTime}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={formik.errors.guests}>
                <FormLabel htmlFor="guests">Number of guests</FormLabel>
                    <NumberInput 
                        name="guests"
                        id="guests"
                        max={10} min={1}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                <FormErrorMessage>{formik.errors.guests}</FormErrorMessage>
            </FormControl> 

            <FormControl isRequired isInvalid={formik.errors.occasion}>
                <FormLabel htmlFor="occasion">Occasion</FormLabel>       
                    <select
                        id="occasion"
                        name="occasion"
                        {...formik.getFieldProps('occasion')}
                    >
                        <option>Birthday</option>
                        <option>Anniversary</option>
                    </select>
                <FormErrorMessage>{formik.errors.occasion}</FormErrorMessage>
            </FormControl>

            <Button
                mt={4}
                colorScheme='teal'
                type='submit'
            >
                Submit
            </Button>
        </form>
    </main>
)}
  
export default Main;
