import { EditorExtensions } from '@/editor/extensions';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import TableOfContents from '../../TableOfContents';
import { Title } from './extensions/title';
import Placeholder from '@tiptap/extension-placeholder';
import { MathExtension } from './extensions/MathExtension';
import { MetaSettingsExtension } from './extensions/MetaSettingsExtension';
import { get } from 'svelte/store';
import { keycloakUserInfo } from '../../../../authStore';
import Document from '@tiptap/extension-document';

export default function getExtensions(provider = null, isAssignment = false) {
	return [
		...EditorExtensions,
		...(provider ? getCollabExtensions(provider) : []),
		Document.extend({
			content: isAssignment ? 'title metaSettings block+' : 'title block+'
		}),
		TableOfContents,
		Title,
		Placeholder.configure({
			placeholder: ({ node }) => {
				if (node.type.name === 'title') {
					return 'Uden titel';
				}

				return '';
			},
			showOnlyCurrent: false
		}),
		MathExtension,
		isAssignment ? MetaSettingsExtension : null
	];
}

function getCollabExtensions(provider) {
	return [
		CollaborationCursor.configure({
			provider: provider,
			user: {
				name: get(keycloakUserInfo).preferred_username,
				color: '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
			}
		}),
		Collaboration.configure({
			document: provider.document
		})
	];
}
