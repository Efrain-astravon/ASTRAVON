CREATE    EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT    INTO public.course (
          id,
          title,
          description,
          "level",
          "createdAt",
          "updatedAt",
          "teacherId",
          "schoolId",
          duration,
          price,
          slug,
          "smallDescription",
          "thumbnailUrl",
          status
          )
VALUES    (
          uuid_generate_v4 (),
          'title5',
          'description long',
          'INTERMEDIATE',
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP,
          '69d65a90-d1f6-416f-a6e2-cddcfc90c3d9',
          'e91164f8-1549-4a3e-bc17-c7bd951387be',
          0,
          0,
          'mini5',
          'short description',
          'https://picsum.photos/200/300?grayscale',
          'PUBLISHED'
          );
