<template>
    <div>
        <ckeditor :editor="editor" :key="counter"></ckeditor>
        <a @click="counter += 1">Refresh</a>
    </div>
</template>

<script lang="ts">
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        name: 'TextEditorField',
        components: {
            ckeditor: CKEditor.component,
        },
        data() {
            return {
                editor: ClassicEditor,
                // editor: window.ClassicEditor,
                counter: 1,
            };
        },
    };
</script>
