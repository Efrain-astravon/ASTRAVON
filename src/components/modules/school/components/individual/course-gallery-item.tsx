import { CourseType } from "@/trpc/routers/course/schemas";
import Image from "next/image";

type GalleryItemProps = {
  course: CourseType;
};

const CourseGalleryItem = ({ course }: GalleryItemProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border-secondary border-1">
      {course.thumbnailUrl && (
        <div className="relative h-32">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{course.title}</h3>
        {course.smallDescription && (
          <p className="text-sm mt-1">{course.smallDescription}</p>
        )}
      </div>
    </div>
  );
}

export default CourseGalleryItem
