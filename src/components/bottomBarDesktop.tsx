import React from "react"
import { BottomNavigation, Button, BottomNavigationAction } from "@material-ui/core"
import LensIcon from '@material-ui/icons/Lens';

type DesktopProps = {
    stepCount: number,
    stepIndex: number,
    handlePrev: any,
    handleNext: any,
    finalButtonText?: string
}

type MobileProps = {
    stepCount: number,
    stepIndex: number,
    handlePrev: any,
    handleNext: any,
    finalButtonText?: string
}

const style = {
    position: "fixed",
    width: "100vw",
    justifyContent: "space-between",
    left: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "#eee",
} as any;

function getStepIcon(stepCount: number){
    let steps = [];

    for (let i = 0; i < stepCount; i++) {
        steps.push(
            <BottomNavigationAction
                disabled
                key={i}
                icon={<LensIcon/>}
                style={{flex: "0 0 0", margin: "auto"}}
            />
        )
    }

    return steps;
}

export function BottomBarDesktop(props: DesktopProps){
    return <BottomNavigation className="unselectable" style={style} value={props.stepIndex + 1}>
        <Button
            onClick={props.handlePrev}
            style={{flex: "1 0 0", margin: "auto"}}>
            Back
        </Button>

        {getStepIcon(props.stepCount)}

        <Button
            color="primary"
            style={{flex: "1 0 0", margin: "auto"}}
            onClick={props.handleNext}>
            {props.stepIndex === props.stepCount-2 ? 'Finish' : (props.stepIndex === props.stepCount-1) ? props.finalButtonText??"Restart" : 'Next'}
        </Button>
    </BottomNavigation>
}

export function BottomBarMobile(props: MobileProps){
    return <BottomNavigation className="unselectable" style={style} value={props.stepIndex + 1}>
        <Button
            onClick={props.handlePrev}
            style={{flex: "1 0 0", margin: "auto"}}>
            Back
        </Button>
        <Button
            color="primary"
            style={{flex: "1 0 0", margin: "auto"}}
            onClick={props.handleNext}>
            {props.stepIndex === props.stepCount-2 ? 'Finish' : (props.stepIndex === props.stepCount-1) ? props.finalButtonText??"Restart" : 'Next'}
        </Button>
    </BottomNavigation>
}