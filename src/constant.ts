const ADMINISTRATOR = 1;
const CUSTOMER = 2;

const ROLES = {
  ADMINISTRATOR,
  CUSTOMER,
};

const TASK_STATUS = {
  PENDING: {
    value: 'PENDING',
    position: 1,
  },
  IN_PROGRESS: {
    value: 'IN_PROGRESS',
    position: 2,
  },
  DONE: {
    value: 'DONE',
    position: 3,
  }
};

const OPERATION = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    CHANGE_ONLY_STATE: 'CHANGE ONLY STATE',
};

const MODULE = {
    PROJECT: 1,
    TASK: 2,
};

export { ROLES, TASK_STATUS, OPERATION, MODULE};
