import React from "react"
import { BottomNavigation, Button, BottomNavigationAction } from "@material-ui/core"
import LensIcon from '@material-ui/icons/Lens';

type DesktopProps = {
    stepCount: number,
    stepIndex: number,
    handlePrev: any,
    handleNext: any
}

type MobileProps = {
    stepIndex: number,
    handlePrev: any,
    handleNext: any
}

const style = {
    position: "fixed",
    width: "100vw",
    justifyContent: "space-between",
    left: 0,
    bottom: 0,
    zIndex: 10
} as any;

function getStepIcon(stepCount: number){
    let steps = [];

    for (let i = 0; i < stepCount; i++) {
        steps.push(
            <BottomNavigationAction
                key={i}
                icon={<LensIcon/>}
                style={{flex: "0 0 0", margin: "auto"}}
            />
        )
    }

    return steps;
}

export function BottomBarDesktop(props: DesktopProps){
    return <BottomNavigation style={style} value={props.stepIndex + 1}>
        <Button
            disabled={props.stepIndex === 0}
            onClick={props.handlePrev}
            style={{flex: "1 0 0", margin: "auto"}}>
            Back
        </Button>

        {getStepIcon(props.stepCount)}

        <Button
            color="primary"
            style={{flex: "1 0 0", margin: "auto"}}
            onClick={props.handleNext}>
            {props.stepIndex === 2 ? 'Finish' : (props.stepIndex === 3) ? 'Restart' : 'Next'}
        </Button>
    </BottomNavigation>
}

export function BottomBarMobile(props: MobileProps){
    return <BottomNavigation style={style} value={props.stepIndex + 1}>
        <Button
            disabled={props.stepIndex === 0}
            onClick={props.handlePrev}
            style={{flex: "1 0 0", margin: "auto"}}>
            Back
        </Button>
        <Button
            color="primary"
            style={{flex: "1 0 0", margin: "auto"}}
            onClick={props.handleNext}>
            {props.stepIndex === 2 ? 'Finish' : (props.stepIndex === 3) ? 'Restart' : 'Next'}
        </Button>
    </BottomNavigation>
}