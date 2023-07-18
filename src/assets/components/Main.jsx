import { useFormik } from "formik";
import { useState } from "react";
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
  } from '@chakra-ui/react'

function Main() {
    const [resDate, setResDate] = useState("")
    const [resTime, setResTime] = useState("")
    const [guests, setGuests] = useState(2)
    const [occasion, setOccasion] = useState("")
    const [availableTimes, setAvailableTimes] = useState(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"])

    const formik = useFormik({
        initialValues: {
            resDate: resDate,
            resTime: resTime,
            guests: guests,
            occasion: occasion,
        },
        onSubmit: (e) => {
            e.preventDefault();
          },
        validationSchema: Yup.object({
            resDate: Yup.date().required('Required'),
            resTime: Yup.string().required('Required'),
            guests: Yup.number().required('Required'),
            occasion: Yup.string().required('Required'),
          }),
      });
  
    return (
    <main>
        <Box>
            <Wrap spacing='135px' mb={10}>
                <WrapItem>
                    <Button colorScheme="green">{<AiOutlineArrowLeft />}</Button>
                </WrapItem>
                <WrapItem>
                    <Heading as="h1">Book a Table</Heading>
                </WrapItem>
            </Wrap>
            
            <form onSubmit={formik.handleSubmit}
            style={{
            display: "grid",
            maxWidth: "225px",
            gap: "15px",
            }}>
                <FormControl isRequired>
                    <FormLabel htmlFor="resDate">Choose date</FormLabel>
                    <Input
                        type="date"
                        id="resDate"
                        name="resDate"
                        value={resDate}
                        onChange={e => setResDate(e.target.value)}
                    />
                    <FormErrorMessage>{formik.errors.resDate}</FormErrorMessage>
                </FormControl>
            
                <FormControl isRequired>
                    <FormLabel htmlFor="resTime">Choose time</FormLabel>
                    <Select
                        id="resTime"
                        name="resTime"
                        onChange={e => setResTime(e.target.value)}
                        placeholder="Select the Time"
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
                            defaultValue={guests}
                            onChange={(value) => setGuests(value)}
                        >
                            <NumberInputField/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    <FormErrorMessage>{formik.errors.guests}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired >
                    <FormLabel htmlFor="occasion">Occasion</FormLabel>
                        <Select
                            id="occasion"
                            name="occasion"
                            placeholder="Select the Occasion"
                            onChange={e => setOccasion(e.target.value)}
                        >
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
                >
                    Submit
                </Button>
            </form>
        </Box>
    </main>
)}
  
export default Main;
