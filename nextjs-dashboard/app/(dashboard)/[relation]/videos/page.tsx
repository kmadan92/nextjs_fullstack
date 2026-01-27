export default async function VideosPage(props: any) {

    const prop = await props.params


    return (

        <>

            This is {prop.relation} page inside video</>
    )
}