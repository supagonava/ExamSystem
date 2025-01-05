import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export default function ExamForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create exam');
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <InputText
          {...register('title', { required: true })}
          className="mt-1 block w-full"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <Controller
          name="duration"
          control={control}
          rules={{ required: true, min: 1 }}
          render={({ field }) => (
            <InputNumber
              value={field.value}
              onValueChange={(e) => field.onChange(e.value)}
              min={1}
              className="mt-1 block w-full"
            />
          )}
        />
        {errors.duration && (
          <span className="text-red-500 text-sm">
            Duration must be at least 1 minute
          </span>
        )}
      </div>

      <Button type="submit" label="Create Exam" className="w-full" />
    </form>
  );
}

