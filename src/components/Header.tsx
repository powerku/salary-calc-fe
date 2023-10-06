type Props = {
    title: string
}
export default function Header({title = ''}: Props) {
    return (<div className="h-16 flex justify-center items-center">
        <h1 className="text-center">{title}</h1>
    </div>)
}