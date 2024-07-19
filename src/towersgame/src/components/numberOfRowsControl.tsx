import { Container, Text } from "@pixi/react";
import { TextButton } from "./textButtonComponent";
import { ICoordinates } from "./interfaces/icoordinates";
import { TextStyle } from "pixi.js";

interface INumberOfRowsProps extends ICoordinates {
    rowFrom: number;
    rowTo: number;
    selectedRowCount: number;
    handleRowSelection: (selectedRow: number) => void;
}
export const NumberOfRowsControl = (props: INumberOfRowsProps) => {
    const numberList = new Array(props.rowTo + 1 - props.rowFrom);
    numberList.fill(0);
    return <Container x={props.x} y={props.y}>
        <Text
            text="Number of Rows"
            x={10}
            y={0}
            style={
                new TextStyle({
                    align: 'center',
                    fill: '0xffffff',
                    fontSize: 24,

                })
            }
        />
        {numberList.map((val, index) => {
            const rowNumber = (index + props.rowFrom);
            const buttonPositionX = 45 * index + 10;
            const isSelected = rowNumber == props.selectedRowCount;
            return <TextButton key={`${val}-${index}`} x={buttonPositionX} y={35} text={`${rowNumber}`}
                width={40} height={20} colour={isSelected ? "#999" : undefined}
                handleClick={() => {
                    props.handleRowSelection(rowNumber);
                }} />
        })}
    </Container>;
}