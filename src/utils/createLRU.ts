import * as Scheduler from 'scheduler';

const {
  unstable_scheduleCallback: scheduleCallback,
  unstable_IdlePriority: IdlePriority,
} = Scheduler;

interface Entry<T> {
  value: T;
  onDelete: () => any;
  previous: Entry<T>;
  next: Entry<T>;
}

export function createLRU<T>(limit: number) {
  let LIMIT = limit;
  let first: Entry<T> | null = null;
  let size: number = 0;

  let cleanUpIsScheduled: boolean = false;

  function scheduleCleanUp() {
    if (cleanUpIsScheduled === false && size > LIMIT) {
      cleanUpIsScheduled = true;
      scheduleCallback(IdlePriority as any, cleanUp as any);
    }
  }

  function cleanUp() {
    cleanUpIsScheduled = false;
    deleteLeastRecentlyUsedEntries(LIMIT);
  }

  function deleteLeastRecentlyUsedEntries(targetSize: number) {
    if (first !== null) {
      const resolvedFirst: Entry<T> = first as any;
      let last: Entry<T> | null = resolvedFirst.previous;
      while (size > targetSize && last !== null) {
        const onDelete = last.onDelete;
        const previous: Entry<T> | null = last.previous;
        last.onDelete = null as any;

        last.previous = last.next = null as any;
        if (last === first) {
          first = null;
          last = null;
        } else {
          (first as any).previous = previous;
          previous.next = first as any;
          last = previous;
        }

        size -= 1;

        onDelete();
      }
    }
  }

  function add(value: T, onDelete: () => any): Entry<T> {
    const entry = {
      value,
      onDelete,
      next: null as any,
      previous: null as any,
    };
    if (first === null) {
      entry.previous = entry.next = entry;
      first = entry;
    } else {
      // Append to head
      const last = first.previous;
      last.next = entry;
      entry.previous = last;

      first.previous = entry;
      entry.next = first;

      first = entry;
    }
    size += 1;
    return entry;
  }

  function update(entry: Entry<T>, newValue: T): void {
    entry.value = newValue;
  }

  function access(entry: Entry<T>): T {
    const next = entry.next;
    if (next !== null) {
      const resolvedFirst: Entry<T> = first as any;
      if (first !== entry) {
        const previous = entry.previous;
        previous.next = next;
        next.previous = previous;

        const last = resolvedFirst.previous;
        last.next = entry;
        entry.previous = last;

        resolvedFirst.previous = entry;
        entry.next = resolvedFirst;

        first = entry;
      }
    } else {
      // Cannot access a deleted entry
    }
    scheduleCleanUp();
    return entry.value;
  }

  function setLimit(newLimit: number) {
    LIMIT = newLimit;
    scheduleCleanUp();
  }

  return {
    add,
    update,
    access,
    setLimit,
  };
}
