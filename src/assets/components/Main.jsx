import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    Input,
    Box,
    Wrap,
    WrapItem,
    Heading,
    Alert,
    AlertIcon,
    Slide,
    Fade,
  } from '@chakra-ui/react'

export default function Main() {

    return (
    <main>
        <Box>
            <Wrap spacing='100' spacingY={0} mb={10}>
                <WrapItem>
                    <Button colorScheme="green" aria-label="Go back">{<AiOutlineArrowLeft />}</Button>
                </WrapItem>
                <WrapItem>
                    <Heading as="h1">Book a Table</Heading>
                </WrapItem>
            </Wrap>
            <Form />
            
        </Box>
    </main>
)}

const Form = () => {
    const [availableTimes, setAvailableTimes] = useState(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"])
    const [showConfirmation, setShowConfirmation] = useState(false)

    useEffect(() => {
        if (showConfirmation) {
            const timeoutId = setTimeout(() => {
                setShowConfirmation(false);
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [showConfirmation])

    // The API did not work for me

    const formik = useFormik({
        initialValues: {
            resDate: "",
            resTime: "",
            guests: "",
            occasion: "",
        },
        onSubmit: () => {
            setShowConfirmation(true);
            formik.resetForm();
          },
        validationSchema: Yup.object({
            resDate: Yup.date()
                .required('Required')
                .min(new Date(), 'Reservation date must be in the future'),
            resTime: Yup.string()
                .required('Required')
                .oneOf(availableTimes, 'Invalid reservation time'),
            guests: Yup.number()
                .required('Required')
                .min(1, 'Must have at least 1 guest')
                .max(10, 'Cannot have more than 10 guests'),
            occasion: Yup.string()
                .required('Required')
          }),
      });

    return (
        <>
        {showConfirmation && (
            <Fade in={showConfirmation}>
                <Alert status="success">
                    <AlertIcon />
                    Your reservation has been confirmed!
            </Alert>
            </Fade>
        )}
        <form onSubmit={formik.handleSubmit}
            style={{
            display: "grid",
            maxWidth: "225px",
            gap: "15px",
            }}>
                <FormControl isRequired isInvalid={formik.touched.resDate && formik.errors.resDate}>
                    <FormLabel htmlFor="resDate">Choose date</FormLabel>
                    <Input
                        type="date"
                        id="resDate"
                        name="resDate"
                        value={formik.values.resDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderRadius={16}
                        aria-label="Reservation date"
                    />
                    <FormErrorMessage>{formik.errors.resDate}</FormErrorMessage>
                </FormControl>
            
                <FormControl isRequired isInvalid={formik.touched.resTime && formik.errors.resTime}>
                    <FormLabel htmlFor="resTime">Choose time</FormLabel>
                    <Select
                        id="resTime"
                        name="resTime"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.resTime}
                        placeholder="Select the Time"
                        borderRadius={16}
                        aria-label="Reservation time"
                    >
                        {availableTimes.map(time => (
                            <option key={time}>{time}</option>
                        ))}
                    </Select>
                    <FormErrorMessage>{formik.errors.resTime}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={formik.touched.guests && formik.errors.guests}>
                    <FormLabel htmlFor="guests">Number of guests</FormLabel>
                        <NumberInput
                            name="guests"
                            id="guests"
                            max={10} min={1}
                            defaultValue={2}
                            onChange={(value) => formik.setFieldValue("guests", value)}
                            onBlur={formik.handleBlur}
                            value={formik.values.guests}
                            aria-label="Number of guests"
                        >
                            <NumberInputField borderRadius={16} placeholder="Max 10"/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    <FormErrorMessage>{formik.errors.guests}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={formik.touched.occasion && formik.errors.occasion}>
                    <FormLabel htmlFor="occasion">Occasion</FormLabel>
                        <Select
                            id="occasion"
                            name="occasion"
                            placeholder="Select the Occasion"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.occasion}
                            borderRadius={16}
                            aria-label="Occasion"
                        >
                            <option>None</option>
                            <option>Birthday</option>
                            <option>Anniversary</option>
                        </Select>
                    <FormErrorMessage>{formik.errors.occasion}</FormErrorMessage>
                </FormControl>
                <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                    bg={"#F4CE14"}
                    color={'black'}
                    aria-label="Confirm reservation"
                >
                    Confirm Reservation
                </Button>
            </form>
        </>
    )
}
