export interface IUpdateable {
    init()
    update(step: number)
    render(dt: number)
}