import TableLessons from "@/app/_components/lessons/TableLessons";
import { IRoleDto } from "@/interfaces/dtos/role/IRoleDto";
import { IUserDto } from "@/interfaces/dtos/user/IUserDto";
import { getServerAuthSession } from "@/utils/auth";


async function LessonsPage() {

    const session = await getServerAuthSession();
    console.log('LessonsPage:::session:::', session);
    const roles: IRoleDto[] = (session?.user?.roles || []).map(roleName => ({
        name: roleName,
    }));
    const user: IUserDto = {
        id: Number(session?.user?.id) || 0,
        email: session?.user?.email || '',
        roles: roles
    }
    return (
        <div className="container mx-auto max-w-md px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800">Lessons</h1>
            <TableLessons user={user} />
        </div>
        
    );
}

export default LessonsPage;