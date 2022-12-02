import {HydratedDocument, model, Schema} from 'mongoose';

import emailValidator from '@/lib/validators/email';

interface UserProperties {
    admin: boolean;
    firstName?: string;
    lastName?: string;
    email: string;
    facebookId?: string;
    googleId?: string;
    password?: string;
    salt?: string;
    usesImperialUnits?: boolean;
}

type UserDocument = HydratedDocument<UserProperties>;

const UserSchema: Schema = new Schema<UserProperties>({
    admin: {
        type: Boolean,
        default: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: emailValidator,
            message: 'Please provide a valid e-mail address.',
        },
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
    },
    salt: {
        type: String,
    },
    usesImperialUnits: {
        type: Boolean,
        default: true,
    },
});

export {UserDocument, UserProperties};
export default model<UserProperties>('User', UserSchema);