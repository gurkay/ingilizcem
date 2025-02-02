'use client'

import TableLessonWords from "@/app/_components/lessons/TableLessonWords";


function LessonWords({ params }: { params: { slug: string } }) {
    return (
        <>
            <TableLessonWords id={ Number(params.slug)} />
        </>
    );
}

export default LessonWords;