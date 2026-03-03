import { Upload } from '@datashare/types';
import { DownloadWithoutPasswordPage } from '../../../../../figma/implementation/src';

export default function Show({ upload }: { upload: Upload }) {
    return <DownloadWithoutPasswordPage fileDetails={upload} />;
}
