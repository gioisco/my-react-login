
function TableUsers({users, loggedUser}) {

    const baseImgURL = 'https://www.ugobetori.it/_notes/api-test/unauth/img/';

    function renderUsers(users) {
        if (users.length === 0) {
            return <tr>
                <td colSpan={4}>No data</td>
            </tr>
        }

        return (
            users
                .filter(user => user.id != loggedUser.id)
                .map(user => (
                    <tr key={user.id}>
                        <td><img src={baseImgURL + user.id + ".png"} /></td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                    </tr>
                ))
        )
    }
    return (
        <table align="center">
            <thead>
                <tr >
                    <th>Propic</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {renderUsers(users)}
            </tbody>
        </table>
    )
}

export default TableUsers