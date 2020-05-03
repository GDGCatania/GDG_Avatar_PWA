import React from "react"
import { BottomNavigation, Button, BottomNavigationAction } from "@material-ui/core"
import LensIcon from '@material-ui/icons/Lens';

type Props = {
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


export function BottomBarDesktop(props: Props){
    return <BottomNavigation style={style} value={props.stepIndex + 1}>
        <Button
            disabled={props.stepIndex === 0}
            onClick={props.handlePrev}
            style={{flex: "1 0 0", margin: "auto"}}>
            Back
        </Button>
        <BottomNavigationAction
            icon={<LensIcon/>}
            style={{flex: "0 0 0", margin: "auto"}}
        />
        <BottomNavigationAction
            icon={<LensIcon/>}
            style={{flex: "0 0 0", margin: "auto"}}
        />
        <BottomNavigationAction
            icon={<LensIcon/>}
            style={{flex: "0 0 0", margin: "auto"}}
        />
        <BottomNavigationAction
            icon={<LensIcon/>}
            style={{flex: "0 0 0", margin: "auto"}}
        />
        <Button
            color="primary"
            style={{flex: "1 0 0", margin: "auto"}}
            onClick={props.handleNext}>
            {props.stepIndex === 2 ? 'Finish' : (props.stepIndex === 3) ? 'Restart' : 'Next'}
        </Button>
    </BottomNavigation>
}

export function BottomBarMobile(props: Props){
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