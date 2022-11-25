import { CircitGroup, BaseComponent } from "./base";
import { Project } from "../../project";
import { deleteTheTail } from "../../../helpers/unit";
import { types } from "mobx-state-tree";
import { makeObservable } from "mobx";

const ConnectorType = types.model({
    show: types.boolean,
    type: types.string,
    claw_length: types.number,
    ground_spacing: types.number,
    claw_width: types.number,
    claw_gap: types.number,
})
    .actions((self) => ({
        set: (key: Extract<keyof typeof self, string>, value: any) => {
            Object.assign(self, { [key]: value });
        },
    }));

const PropModel = types.model({
    cross_width: types.number,
    cross_length: types.number,
    cross_gap: types.number,
    up: ConnectorType,
    down: ConnectorType,
    left: ConnectorType,
    right: ConnectorType,
})


export class TransmonCross extends BaseComponent<typeof PropModel> {
    static override get metadata(): CircuitCompMetadata {
        return {
            name: 'TransmonCross',
            icon: '',
            group: CircitGroup.QUBIT,
            model: PropModel
        }
    }
    initState: boolean = true

    constructor(project: Project, jsonData?: any) {
        super(project,
            {
                cross_width: jsonData ? jsonData.cross_width : 20,
                cross_length: jsonData ? jsonData.cross_length : 200,
                cross_gap: jsonData ? jsonData.cross_gap : 20,
                up: jsonData
                    ? {
                        show: jsonData.up
                            ? typeof jsonData.up.show == "boolean"
                                ? jsonData.up.show
                                : true
                            : false,
                        type: jsonData.up
                            ? jsonData.up.connector_type
                                ? jsonData.up.connector_type == "0"
                                    ? "pack"
                                    : "line"
                                : jsonData.up.type
                            : "pack",
                        claw_length: jsonData.up
                            ? deleteTheTail(jsonData.up.claw_length)
                            : 40,
                        ground_spacing: jsonData.up
                            ? deleteTheTail(jsonData.up.ground_spacing)
                            : 5,
                        claw_width: jsonData.up
                            ? deleteTheTail(jsonData.up.claw_width)
                            : 10,
                        claw_gap: jsonData.up
                            ? deleteTheTail(jsonData.up.claw_gap)
                            : 5,
                    }
                    : {
                        show: true,
                        type: "pack",
                        claw_length: 40,
                        ground_spacing: 5,
                        claw_width: 10,
                        claw_gap: 5,
                    },
                down: jsonData
                    ? {
                        show: jsonData.down
                            ? typeof jsonData.down.show == "boolean"
                                ? jsonData.down.show
                                : true
                            : false,
                        type: jsonData.down
                            ? jsonData.down.connector_type
                                ? jsonData.down.connector_type == "0"
                                    ? "pack"
                                    : "line"
                                : jsonData.down.type
                            : "pack",
                        claw_length: jsonData.down
                            ? deleteTheTail(jsonData.down.claw_length)
                            : 40,
                        ground_spacing: jsonData.down
                            ? deleteTheTail(jsonData.down.ground_spacing)
                            : 5,
                        claw_width: jsonData.down
                            ? deleteTheTail(jsonData.down.claw_width)
                            : 10,
                        claw_gap: jsonData.down
                            ? deleteTheTail(jsonData.down.claw_gap)
                            : 5,
                    }
                    : {
                        show: true,
                        type: "pack",
                        claw_length: 40,
                        ground_spacing: 5,
                        claw_width: 10,
                        claw_gap: 5,
                    },
                left: jsonData
                    ? {
                        show: jsonData.left
                            ? typeof jsonData.left.show == "boolean"
                                ? jsonData.left.show
                                : true
                            : false,
                        type: jsonData.left
                            ? jsonData.left.connector_type
                                ? jsonData.left.connector_type == "0"
                                    ? "pack"
                                    : "line"
                                : jsonData.left.type
                            : "pack",
                        claw_length: jsonData.left
                            ? deleteTheTail(jsonData.left.claw_length)
                            : 40,
                        ground_spacing: jsonData.left
                            ? deleteTheTail(jsonData.left.ground_spacing)
                            : 5,
                        claw_width: jsonData.left
                            ? deleteTheTail(jsonData.left.claw_width)
                            : 10,
                        claw_gap: jsonData.left
                            ? deleteTheTail(jsonData.left.claw_gap)
                            : 5,
                    }
                    : {
                        show: true,
                        type: "line",
                        claw_length: 40,
                        ground_spacing: 5,
                        claw_width: 10,
                        claw_gap: 5,
                    },
                right: jsonData
                    ? {
                        show: jsonData.right
                            ? typeof jsonData.right.show == "boolean"
                                ? jsonData.right.show
                                : true
                            : false,
                        type: jsonData.right
                            ? jsonData.right.connector_type
                                ? jsonData.right.connector_type == "0"
                                    ? "pack"
                                    : "line"
                                : jsonData.right.type
                            : "pack",
                        claw_length: jsonData.right
                            ? deleteTheTail(jsonData.right.claw_length)
                            : 40,
                        ground_spacing: jsonData.right
                            ? deleteTheTail(jsonData.right.ground_spacing)
                            : 5,
                        claw_width: jsonData.right
                            ? deleteTheTail(jsonData.right.claw_width)
                            : 10,
                        claw_gap: jsonData.right
                            ? deleteTheTail(jsonData.right.claw_gap)
                            : 5,
                    }
                    : {
                        show: true,
                        type: "line",
                        claw_length: 40,
                        ground_spacing: 5,
                        claw_width: 10,
                        claw_gap: 5,
                    },
            },
            {
                cross_width: { unit: true,min: 0, default: 20 },
                cross_length: { unit: true, min: 0, default: 200 },
                cross_gap: { unit: true, min: 0, default: 20 },
            },
            {
                up: {
                    type: {
                        type: "select",
                        options: ["pack", "line"],
                        default: "pack",
                    },
                    claw_length: { unit: true, min: 0, default: 40 },
                    ground_spacing: { unit: true, min: 0, default: 5 },
                    claw_width: { unit: true, min: 0, default: 10 },
                    claw_gap: { unit: true, min: 0, default: 5 },
                },
                down: {
                    type: {
                        type: "select",
                        options: ["pack", "line"],
                        default: "pack",
                    },
                    claw_length: { unit: true, min: 0, default: 40 },
                    ground_spacing: { unit: true, min: 0, default: 5 },
                    claw_width: { unit: true, min: 0, default: 10 },
                    claw_gap: { unit: true, min: 0, default: 5 },
                },
                left: {
                    type: {
                        type: "select",
                        options: ["pack", "line"],
                        default: "line",
                    },
                    claw_length: { unit: true, min: 0, default: 40 },
                    ground_spacing: { unit: true, min: 0, default: 5 },
                    claw_width: { unit: true, min: 0, default: 10 },
                    claw_gap: { unit: true, min: 0, default: 5 },
                },
                right: {
                    type: {
                        type: "select",
                        options: ["pack", "line"],
                        default: "line",
                    },
                    claw_length: { unit: true, min: 0, default: 40 },
                    ground_spacing: { unit: true, min: 0, default: 5 },
                    claw_width: { unit: true, min: 0, default: 10 },
                    claw_gap: { unit: true, min: 0, default: 5 },
                },
            })

        this.component = 'TransmonCross'
        this.connectionProperties = 'passive'
        makeObservable(this)
    }
}