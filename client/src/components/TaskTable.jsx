import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import PropTypes from "prop-types";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import clsx from "clsx";
import UserInfo from "./UserInfo";
import moment from "moment";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Task Tittle</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Team</th>
        <th className="py-2 hidden md:block">Created at</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "w-4 h-4 rounded-full hidden md:block",
              TASK_TYPE[task.stage]
            )}
          />
          <p className="text-base text-black">{task.title}</p>
        </div>
      </td>
      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>
      <td className="py-2">
        <div className="flex">
          {task.team.map((member, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={member} />
            </div>
          ))}
        </div>
      </td>
      <td className="hidden md:block">
        <span className="text-base text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  TableRow.propTypes = {
    task: PropTypes.object.isRequired,
  };

  return (
    <div className="w-full md:w-2/3 bg-white px-2 md:px-4 py-4 shadow-md rounded">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {tasks.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

TaskTable.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TaskTable;
