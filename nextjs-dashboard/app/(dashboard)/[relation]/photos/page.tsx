export default async function PhotosPage(props: any) {

    const prop = await props.params


    return (

        <>

            This is {prop.relation} page inside photos</>
    )
}