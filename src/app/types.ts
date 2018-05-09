import "fpsmeter"

export type  RunOptions = {
    fps: number,
    fpsmeter: FPSMeter,
    update: (number) => void,
    render: (number) => void
}