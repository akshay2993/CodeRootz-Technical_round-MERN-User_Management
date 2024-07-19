import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FiEdit } from 'react-icons/fi'
import EditUserDialog from '../components/EditUserDialog'

const UserManagement = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    const dialog = useRef()

    const fetchUsers = async () => {
     try {
       const userData = await axios.get('http://localhost:3000/api/users')
        //  console.log(userData.data)
         setUsers(userData.data)
     } catch (error) {
      console.log(error)
     }
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    const handleEditClick = (user) => {
      setSelectedUser(user)
      if(dialog.current){
        dialog.current.open()
      }
    }
    
  return (
    <>
    {selectedUser && <EditUserDialog ref={dialog} user={selectedUser} onclose={fetchUsers} />}
    {users && users.length > 0 ? (
      <div className="w-full max-w-[820px] mx-auto bg-gray-200 p-6 px-1 md:px-6 rounded-xl">
      {/*<h1>Users</h1>*/}
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="h-10">
              <th className="border border-slate-600 rounded-md">S.No.</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md max-sm:hidden">
                Email
              </th>
              <th className="border border-slate-600 rounded-md">
                Role
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const { _id, name, email, role } = user;
              const serialNo = index + 1;
              return (
                <tr key={_id} className="h-10">
                  <td className="border border-slate-600 rounded-md text-center">
                    {serialNo}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center">
                    {name}
                  </td>
                  <td className="border border-slate-600 rounded-md max-sm:hidden text-center">
                    {email}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center">
                    {role.name}
                  </td>
                  <td className="border border-slate-600 rounded-md">
                    <div className="flex justify-center gap-x-4 items-center">
                      <button onClick={() => handleEditClick(user)}>
                        <FiEdit className="text-xl text-green-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      ) : (
        <p>No users available!</p>
      )}
    </>
  )
}

export default UserManagement
