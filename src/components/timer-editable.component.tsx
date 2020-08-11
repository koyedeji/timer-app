import React, { useState } from 'react';
import { TimerForm } from './timer-form.component';
import { Timer } from './timer.component';

interface EditableTimerProps {
  title: string;
  id: string;
  project: string;
  elapsed: number;
  isRunning: boolean;
  onDelete: (timerId: string) => void;
  onEdit: (timer: { id: string; project: string; title: string }) => void;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onReset: (id: string) => void;
}

export const EditableTimer = ({
  id,
  elapsed,
  title,
  isRunning,
  project,
  onDelete,
  onEdit,
  onStart,
  onStop,
  onReset,
}: EditableTimerProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const toggleFormOpen = () => setOpen((prev) => !prev);

  const handleEdit = (inputDTO: { project: string; title: string }) => {
    onEdit({
      ...inputDTO,
      id: id,
    });
  };

  if (isOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onSubmit={handleEdit}
        onCancel={toggleFormOpen}
      />
    );
  }

  return (
    <Timer
      project={project}
      isRunning={isRunning}
      title={title}
      id={id}
      elapsed={elapsed}
      onOpenEditForm={toggleFormOpen}
      onStop={onStop}
      onStart={onStart}
      onDelete={onDelete}
      onReset={onReset}
    />
  );
};
