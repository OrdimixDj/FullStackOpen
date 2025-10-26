const Filter = ({setNewFilter}) => {
    const handleFilterInputChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
    <div>filter shown with <input onChange={handleFilterInputChange} /></div>
    )
}

export default Filter