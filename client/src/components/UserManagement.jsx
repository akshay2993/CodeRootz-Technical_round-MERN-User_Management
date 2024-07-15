import { useEffect, useState } from 'react'
import axios from 'axios'
import { FiEdit } from 'react-icons/fi'

const UserManagement = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const userData = await axios.get('http://localhost:3000/api/users')
            console.log(userData.data)
            setUsers(userData.data)
        }

        fetchUsers()
    }, [])
    
  return (
    <>

    {users && users.length > 0 ? (
        <div className="w-full max-w-[820px] mx-auto bg-gray-200 p-6 px-1 md:px-6 rounded-xl">
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
                      <button onClick={() => {}}>
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
