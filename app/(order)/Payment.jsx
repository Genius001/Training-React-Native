import { View, Text } from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import React, { useState } from "react";

export default function Payment() {
    const [activeStep, setActiveStep] = useState(0)
    return (
        <View style={{ flex: 1 }}>
            <ProgressSteps removeBtnRow={true} activeStep={activeStep}>
                <ProgressStep label="Pilih Metode" nextBtnStyle={{ display: 'none' }}>
                    <Step1 setActiveStep={setActiveStep} />
                </ProgressStep>
                <ProgressStep label="Bayar" nextBtnStyle={{ display: 'none' }}>
                    <Step2 setActiveStep={setActiveStep} />
                </ProgressStep>
                <ProgressStep label="Tiket" nextBtnStyle={{ display: 'none' }}>
                    <Step3 setActiveStep={setActiveStep} />
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
}