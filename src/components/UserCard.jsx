import React from 'react'

const UserCard = ({ user }) => {
 const { _id, firstName, lastName, age, gender, about, url, skills } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={url}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
         <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
     <div className="card-actions justify-center my-4">
          <button
            className="btn btn-accent"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleSendRequest("intrested", _id);
            }}
          >
            Intrested
          </button>
        </div>
  </div>
</div>
  )
}

export default UserCard