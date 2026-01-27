export default async function RelationPage(props: any) {

    const prop = await props.params


    return (

        <>

            This is {prop.relation} page</>
    )
}