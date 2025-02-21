import SvgIcon from '../icons/SvgIcon';

export default function TaskCard() {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="p-[15px] rounded-lg shadow-[2px_2px_4px_2px_rgba(0,0,0,0.1)]">
        <div className="flex flex-nowrap items-center gap-[5px] max-sm:w-[120px]">
          <SvgIcon
            className="text-accent"
            width={24}
            height={24}
            pathData="M16 4H9.5L7 14L10.3614 13.253L8 20H8.5L17 9L13.15 9.7L16 4Z"
            viewBox="0 0 24 24"
          />

          <h3 className="text-title font-medium">Task 1</h3>

          <SvgIcon
            className="text-black ml-auto"
            width={24}
            height={24}
            pathData="M12 8.5C12.83 8.5 13.5 7.83 13.5 7C13.5 6.17 12.83 5.5 12 5.5C11.17 5.5 10.5 6.17 10.5 7C10.5 7.83 11.17 8.5 12 8.5ZM12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5ZM12 15.5C11.17 15.5 10.5 16.17 10.5 17C10.5 17.83 11.17 18.5 12 18.5C12.83 18.5 13.5 17.83 13.5 17C13.5 16.17 12.83 15.5 12 15.5Z"
            viewBox="0 0 24 24"
          />
        </div>

        <div className="my-[25px] border-t border-border"></div>

        <div className="text-body">Description</div>

        <div className="w-[150px] mx-auto mt-[15px] rounded-[5px] bg-accent text-fade text-subHeading text-center hover:opacity-75">
          Save
        </div>
      </div>
    </div>
  );
}
