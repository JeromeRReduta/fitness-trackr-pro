import { useParams } from "react-router";
import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

export default function SetForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/sets", ["routines"]);
  const { id } = useParams();
  const addSet = (formData) => {
    const activityId = formData.get("activityId");
    const count = formData.get("count");

    let routineId;
    try {
      routineId = parseInt(id);
    } catch (error) {
      routineId = null;
    }
    console.log({ activityId, routineId, count });
    add({ activityId, routineId, count });
  };

  let buttonMessage;
  if (loading) {
    buttonMessage = "Submitting...";
  } else if (error) {
    buttonMessage = error;
  } else {
    buttonMessage = "Submit activity";
  }

  return (
    <>
      <h2>Add a new set</h2>
      <form action={addSet}>
        <label>
          <ActivitySelect name="activityId" />
        </label>
        <label>
          Number of sets
          <input type="number" name="count" min="0" max={Number.MAX_VALUE} />
        </label>
        <button>{buttonMessage}</button>
      </form>
    </>
  );
}

function ActivitySelect({ name }) {
  const { data, loading, error } = useQuery("/activities", "activities");

  if (error) {
    console.error(error);
    return (
      <select name={name}>
        <option value={null}>{error}</option>
      </select>
    );
  }
  if (loading || !data) {
    return (
      <select name={name}>
        <option value={null}>Loading activities...</option>
      </select>
    );
  }

  const options = data.map((activity) => (
    <option key={activity.id} value={activity.id}>
      {activity.name}
    </option>
  ));

  return (
    <select name={name}>
      <option value={null}>Select an activity (basic)</option>
      {options}
    </select>
  );
}

//   const {
//     mutate: add,
//     loading,
//     error,
//   } = useMutation("POST", "/routines", ["routines"]);

//   const addRoutine = (formData) => {
//     const name = formData.get("name");
//     const goal = formData.get("goal");
//     add({ name, goal });
//   };

//   return (
//     <>
//       <h2>Add a new routine</h2>
//       <form action={addRoutine}>
//         <label>
//           Name
//           <input type="text" name="name" autoComplete="on" required />
//         </label>
//         <label>
//           Goal
//           <input type="text" name="goal" autoComplete="on" required />
//         </label>
//         <button>{loading ? "Adding..." : "Add routine"}</button>
//         {error && <output>{error}</output>}
//       </form>
//     </>
//   );
