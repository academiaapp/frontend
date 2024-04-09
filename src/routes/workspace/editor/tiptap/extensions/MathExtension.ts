import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import Math from './Math.svelte';
export const MathExtension = Node.create({
	name: 'math',
	inline: true,
	group: 'inline',
	selectable: true,
	// content: 'text*',

	parseHTML() {
		return [{ tag: 'math-component' }];
	},

	onSelectionUpdate({ editor }) {
		const startTime = performance.now();
		const selection = editor.state.selection;
		if (!selection.node) return;
		const type: string = selection.node.type.name;
		if (type != 'math') return;
		console.log(selection);
		const elem: HTMLSpanElement = editor.view.nodeDOM(selection.from);
		console.log(elem);
		this.editor.commands.setTextSelection(this.editor.state.selection.from);
		console.log(elem.querySelector('math-field').focus());
		// Existing code
		const endTime = performance.now();
		const duration = endTime - startTime;
		console.log(`Selection update took ${duration} milliseconds.`);
	},

	renderHTML({ HTMLAttributes }) {
		return ['math-component', mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(Math);
	},

	onBlur({ editor }) {
		console.log('blur');
	},
	addKeyboardShortcuts() {
		return {
			'Mod-m': () => {
				this.editor.commands.insertContent('<math-component></math-component>');
				setTimeout(() => {
					this.editor.commands.setNodeSelection(this.editor.state.selection.from - 1);
				}, 1);
			},
			'alt-m': () => {
				this.editor.commands.insertContent('<math-component></math-component>');
				setTimeout(() => {
					this.editor.commands.setNodeSelection(this.editor.state.selection.from - 1);
				}, 1);
			}
		};
	},

	addAttributes() {
		return {
			count: {
				default: ''
			}
		};
	},

	addCommands() {
		return {
			setMath:
				() =>
				({ commands }) => {
					commands.insertContent({
						type: this.name
					});
					setTimeout(() => {
						this.editor.commands.setNodeSelection(this.editor.state.selection.from - 1);
					}, 1);
				}
		};
	}
});
